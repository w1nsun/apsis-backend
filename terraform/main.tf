provider "aws" {
  region = "eu-central-1"
}

resource "aws_lightsail_instance" "nestjs_app" {
  name              = "nestjs-lightsail-instance"
  availability_zone = "eu-central-1a"
  blueprint_id = "ubuntu_20_04"
  bundle_id         = "small_2_0"

  user_data = <<-EOF
            #!/bin/bash
            exec > /var/log/user_data.log 2>&1
            set -x

            # Update packages and install required dependencies
            sudo apt-get update -y
            sudo apt-get install -y git curl
            sudo apt-get install -y build-essential

            # Install nvm (Node Version Manager) to install Node.js 20
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

            # Install Node.js 20 using nvm
            nvm install 20
            nvm use 20

            # Ensure npm and node are in the PATH
            export PATH=$PATH:$NVM_DIR/versions/node/v20/bin

            # Install pm2 to manage the Node.js application
            npm install -g pm2

            # Clone your NestJS app or copy the code to /home/ubuntu/app
            cd /home/ubuntu
            sudo git clone https://github.com/w1nsun/apsis-backend.git app || {
              echo "Failed to clone repository. Please check your repository URL or access permissions." > /home/ubuntu/deploy-error.log
              exit 1
            }
            cd app

            # Change ownership to ubuntu
            sudo chown -R ubuntu:ubuntu /home/ubuntu/app

            # Install dependencies and build the NestJS application
            retry_count=0
            while [ $retry_count -lt 5 ]
            do
              npm install && break
              retry_count=$((retry_count+1))
              echo "Retrying npm install ($retry_count)..."
              sleep 5
            done

            if [ $retry_count -ge 5 ]; then
              echo "Failed to install npm dependencies." > /home/ubuntu/deploy-error.log
              exit 1
            fi

            npm run build || {
              echo "Failed to build the NestJS application." > /home/ubuntu/deploy-error.log
              exit 1
            }

            # Start the application with pm2 on port 80
            pm2 start dist/main.js --name "nestjs-app" -- -p 80
            pm2 save
            EOF

  tags = {
    Name = "NestJS-Lightsail-App"
  }
}

resource "aws_lightsail_static_ip" "nestjs_ip" {
  name = "nestjs-static-ip"
}

resource "aws_lightsail_static_ip_attachment" "ip_attachment" {
  static_ip_name   = aws_lightsail_static_ip.nestjs_ip.name
  instance_name    = aws_lightsail_instance.nestjs_app.name
}

output "lightsail_app_ip" {
  value = aws_lightsail_static_ip.nestjs_ip.ip_address
  description = "The public IP address of your NestJS application."
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "insecure_sg" {
  name_prefix = "snyk_demo_sg"
  description = "Security group for demo app, allows HTTP/HTTPS traffic"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["192.168.1.0/24"]  # Allows traffic from any IP (insecure)
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["192.168.1.0/24"]  # Allows outbound traffic to any IP
  }
}

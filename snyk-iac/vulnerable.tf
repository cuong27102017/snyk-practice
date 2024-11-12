provider "aws" {
  region = "us-east-1"
}

# Define a security group with open ingress rules
resource "aws_security_group" "insecure_sg" {
  name_prefix = "snyk_demo_sg"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # Allows traffic from any IP (insecure)
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # Allows outbound traffic to any IP
  }
}

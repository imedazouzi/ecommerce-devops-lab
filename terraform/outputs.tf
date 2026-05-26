output "instance_public_ips" {
  value = aws_instance.web[*].public_ip
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
}
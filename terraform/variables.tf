provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  type = string
  validation {
    condition     = length(var.project_id) > 0
    error_message = "Project ID must not be empty"
  }
}

variable "region" {
  type    = string
  default = "us-west4"
}

variable "image_tag" {
  type    = string
  default = "latest"
}

variable "google_api_key" {
  type        = string
  sensitive   = true
  description = "Google AI API key for GenKit"
}
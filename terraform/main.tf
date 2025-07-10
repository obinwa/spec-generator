resource "google_artifact_registry_repository" "docker_repo" {
  location      = "us-west4"
  repository_id = "swagger-generator"
  format        = "DOCKER"
}

resource "google_cloud_run_service" "genkit" {
  depends_on = [google_artifact_registry_repository.docker_repo]
  name     = "swagger-generator-app"
  location = "us-west4"

  template {
    spec {
      containers {
        # Reference the pushed image
        image = "us-west4-docker.pkg.dev/${var.project_id}/swagger-generator/swagger-generator-app:${var.image_tag}"
        
        ports {
          container_port = 8080
        }
        
        env {
          name  = "NODE_ENV"
          value = "production"
        }
        env {
          name  = "GOOGLE_API_KEY"
          value = var.google_api_key  # Will be passed from GitHub Secrets
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.genkit.location
  project  = google_cloud_run_service.genkit.project
  service  = google_cloud_run_service.genkit.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
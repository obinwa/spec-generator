- name: Create tfvars file
  run: |
    cat <<EOF > terraform.tfvars
    project_id = "$PROJECT_ID"
    google_api_key = "$GOOGLE_API_KEY"
    image_tag = "$IMAGE_TAG"
    EOF
  working-directory: ./terraform

- name: Terraform Apply
  run: terraform apply -auto-approve -lock-timeout=5m
  working-directory: ./terraform
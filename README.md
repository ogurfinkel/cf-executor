# cf-executor
CF executor - workflow for yaml files based on codefresh (https://codefresh.io) format

- Run the server - npm run start or run build the docker's image and run it
- Check out the public methods 
#methods :

- Post : http://127.0.0.1:8080/execute
> Sample data :

```sh
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: ogurfinkel/demochat
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile: Dockerfile
  RunningUnitTests:
    title: Running Unit Tests
    type: composition
    composition: 5ba78ebd1e5d1decced7e9ca
    composition_candidates:
      cf_unit_test:
        image: '${{BuildingDockerImage}}'
        entrypoint: sh /codefresh/volume/cf-generated/unit_test_script
        volumes:
          - '${{CF_VOLUME_NAME}}:/codefresh/volume'
    add_flow_volume_to_composition: true
    create_file:
      path: /codefresh/volume/cf-generated
      name: unit_test_script
      content: npm test
    on_success:
      metadata:
        set:
          - '${{BuildingDockerImage.imageId}}':
              - CF_QUALITY: true
    on_fail:
      metadata:
        set:
          - '${{BuildingDockerImage.imageId}}':
              - CF_QUALITY: false

```
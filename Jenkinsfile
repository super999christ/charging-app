pipeline {
    agent {
        label "docker-agent"
    }

    environment {
        AWS_REGION = "us-west-2"
        IMAGE_NAME = "charging/charging-ui"
        ECR_URI = "101265448075.dkr.ecr.${AWS_REGION}.amazonaws.com"
        IMAGE_FQDN = "${ECR_URI}/${IMAGE_NAME}"
    }

    stages {
        stage("Git checkout") {
            steps {
                git branch: "main", credentialsId: "jenkins", url: "https://github.com/AtlisMotorVehicles/Charging-App"
            }
        }
        stage("Build") { 
            steps { 
                script {
                    env.TAG = input message: 'Please enter image tag',
                                        parameters: [string(defaultValue: 'latest', description: '', name: 'tag')]
                    app = docker.build("${IMAGE_NAME}")
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    docker.withRegistry("https://${env.ECR_URI}", "ecr:${env.AWS_REGION}:jenkins-ecr-pusher") {
                        app.push("${env.TAG}")
                    }
                }
            }
        }
    }
}
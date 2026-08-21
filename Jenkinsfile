pipeline {

    agent any

    stages {

        stage('Checkout') {

            steps {

                echo 'Checking out source code...'

                checkout scm
            }
        }


        stage('Maven Build') {

            steps {

                echo 'Building Spring Boot application...'

                sh '''
                    cd backend
                    mvn clean package -DskipTests
                '''
            }
        }


        stage('Unit Tests') {

            steps {

                echo 'Running unit tests...'

                sh '''
                    cd backend
                    mvn test
                '''
            }
        }


        stage('Docker Build') {

            steps {

                echo 'Building Docker images...'

                sh '''
                    docker compose build
                '''
            }
        }


        stage('Deploy') {

            steps {

                echo 'Deploying application...'

                sh '''
                    docker compose up -d
                '''
            }
        }


        stage('Verify') {

            steps {

                echo 'Checking containers...'

                sh '''
                    docker compose ps
                '''
            }
        }
    }


    post {

        success {

            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {

            echo 'CI/CD Pipeline failed!'
        }
    }
}

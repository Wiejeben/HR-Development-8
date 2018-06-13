pipeline {
  agent {
    docker {
      image 'node:alpine'
    }

  }
  stages {
    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
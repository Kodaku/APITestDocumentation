---
sidebar_position: 1
---

# Write a Basic Pipeline In Jenkins

In this chapter we will see how to write a very basic pipeline in Jenkins with the assumption that you're able to create a Pipeline project and you know how to run it.

## Pipeline Code

For the sake of simplicity and clarity we will write nothing special but a simple print.

```groovy
pipeline {
    agent any
    stages {
        stage("A basic print") {
            steps {
                script {
                    println "Hello"
                }
            }
        }
    }
}
```

## Code Explanation

* The *pipeline*  statement is just initializing the Jenkins pipeline.
* The *agent* statement execute this Pipeline or any of its stages, on any available agent.
* The *stages* statement is used to tell Jenkins that all of the code that will be in the curly brackets will have to be executed under different stages (at least one)
* The *stage* statement defines a conceptually distinct subset of tasks performed through the entire Pipeline
* The *steps* statement is a single task. Fundamentally, a step tells Jenkins what to do at a particular point in time
* The *script* statement is used to tell Jenkins that there will be Groovy code to be executed

An important aspect of the Jenkins pipeline is that it executes all the stages sequentially and if a stage fails then all the others after it will fail since the pipeline will interrupt because of the failure of the stage.

## References
* [Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
* [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
* [Jenkins Agent](https://www.jenkins.io/doc/book/using/using-agents/)

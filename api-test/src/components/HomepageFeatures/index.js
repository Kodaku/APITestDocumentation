import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
    {
        title: "Use Jenkins",
        Svg: require("@site/static/img/jenkins.svg").default,
        description: (
            <>
                Jenkins is an open source automation server. It helps automate
                the parts of software development related to building, testing,
                and deploying, facilitating continuous integration and
                continuous delivery
            </>
        ),
    },
    {
        title: "Use Jenkins Pipeline",
        Svg: require("@site/static/img/jenkinsPipeline.svg").default,
        description: (
            <>
                Jenkins Pipeline is a
                suite of plugins which supports implementing and integrating
                continuous delivery pipelines into Jenkins.
            </>
        ),
    },
    {
        title: "Test API",
        Svg: require("@site/static/img/jenkinsAPI.svg").default,
        description: <>Use plugins like http request and pipeline utility steps to test your API</>,
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

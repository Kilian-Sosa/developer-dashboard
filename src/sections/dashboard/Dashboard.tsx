import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infrastructure/GitHubApiResponse";
import styles from "./Dashboard.module.scss";
import Brand from "/assets/images/brand.svg";
import Check from "/assets/images/check.svg";
import Error from "/assets/images/error.svg";
import PullRequests from "/assets/images/git-pull-request.svg";
import IssueOpened from "/assets/images/issue-opened.svg";
import Lock from "/assets/images/lock.svg";
import Forks from "/assets/images/repo-forked.svg";
import Start from "/assets/images/star.svg";
import Unlock from "/assets/images/unlock.svg";
import Watchers from "/assets/images/watchers.svg";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffDays = currentDate.getDate() - lastUpdateDate.getDate();

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function Dashboard() {
	const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
	const [repositoryData, setRepositoryData] = useState<GitHubApiResponses[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<img src={Brand} alt="Brand image" />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositoryData.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.owner.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.owner.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <img src={Lock} alt="Lock image" /> : <img src={Unlock} alt="Unlock image" />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === "completed" ? (
											<img src={Check} alt="Check image" />
										) : (
											<img src={Error} alt="Error image" />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<img src={Start} alt="Start image" />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={Watchers} alt="Watchers image" />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={Forks} alt="Forks image" />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={IssueOpened} alt="IssueOpened image" />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={PullRequests} alt="PullRequests image" />
								<span>{widget.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
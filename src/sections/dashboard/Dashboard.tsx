import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
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
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

const isoToReadableDate = (lastUpdateDate: Date): string => {
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function Dashboard({repository}: { repository: GitHubRepositoryRepository }) {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

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
					<article className={styles.widget} key={`${widget.id.owner}/${widget.id.name}`}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.url}
								target="_blank"
								title={`${widget.id.owner}/${widget.id.name}`}
								rel="noreferrer"
							>
								{widget.id.owner}/{widget.id.name}
							</a>
							{widget.private ? <img src={Lock} alt="Lock image" /> : <img src={Unlock} alt="Unlock image" />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
								{widget.hasWorkflows && (
									<div>
										{widget.isLastWorkflowSuccess ? (
											<img src={Check} alt="Check image" />
										) : (
											<img src={Error} alt="Error image" />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<img src={Start} alt="Start image" />
								<span>{widget.stars}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={Watchers} alt="Watchers image" />
								<span>{widget.watchers}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={Forks} alt="Forks image" />
								<span>{widget.forks}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={IssueOpened} alt="IssueOpened image" />
								<span>{widget.issues}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={PullRequests} alt="PullRequests image" />
								<span>{widget.pullRequests}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
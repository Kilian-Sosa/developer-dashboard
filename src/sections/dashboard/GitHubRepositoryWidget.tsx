import { GitHubRepository } from "../../domain/GitHubRepository"

import styles from "./GitHubRepositoryWidget.module.scss";
import Check from "/assets/images/check.svg";
import Error from "/assets/images/error.svg";
import PullRequests from "/assets/images/git-pull-request.svg";
import IssueOpened from "/assets/images/issue-opened.svg";
import Lock from "/assets/images/lock.svg";
import Forks from "/assets/images/repo-forked.svg";
import Start from "/assets/images/star.svg";
import Unlock from "/assets/images/unlock.svg";
import Watchers from "/assets/images/watchers.svg";

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

export const GitHubRepositoryWidget = ({ widget }: {widget: GitHubRepository}) => {
  return (
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
  )
}

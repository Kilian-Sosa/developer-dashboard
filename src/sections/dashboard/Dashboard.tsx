import { githubApiResponses } from "../../github_api_responses";
import Brand from "../../../public/images/brand.svg";
import Check from "../../../public/images/check.svg";
import styles from "./Dashboard.module.scss";
import Error from "../../../public/images/error.svg";
import PullRequests from "../../../public/images/git-pull-request.svg";
import IssueOpened from "../../../public/images/issue-opened.svg";
import Lock from "../../../public/images/lock.svg";
import Forks from "../../../public/images/repo-forked.svg";
import Start from "../../../public/images/star.svg";
import Unlock from "../../../public/images/unlock.svg";
import Watchers from "../../../public/images/watchers.svg";

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
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<img src={Brand} alt="Brand image" />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{githubApiResponses.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <img src={Lock} alt="Lock image" /> : <img src={Unlock} alt="Unlock image" />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.CiStatus.workflow_runs.length > 0 && (
									<div>
										{widget.CiStatus.workflow_runs[0].status === "completed" ? (
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
								<img src={IssueOpened} alt="Issue Opened image" />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<img src={PullRequests} alt="Pull Requests image" />
								<span>{widget.pullRequest.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
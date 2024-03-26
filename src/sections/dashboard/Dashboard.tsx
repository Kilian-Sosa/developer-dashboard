import { useEffect, useState } from "react";

import styles from "./Dashboard.module.scss";
import Brand from "/assets/images/brand.svg";
import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";



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
					<GitHubRepositoryWidget key={`${widget.id.owner}/${widget.id.name}`} widget={widget} />
				))}
			</section>
		</>
	);
}
export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "2565fa91-2ac4-4e4f-9111-6d27a598082d",
			repository_url: "https://github.com/abigailCode/ArtenaraProject",
		},
		{
			id: "a66d5092-5ba6-4184-9931-cc485defe412",
			repository_url: "https://github.com/Kilian-Sosa/samukoi",
		},
		{
			id: "7c7a6b71-76dc-42ce-a46b-1730fc758193",
			repository_url: "https://github.com/Kilian-Sosa/el-rescate-del-garajonay",
		},
	],
};
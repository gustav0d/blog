export const SITE = {
  title: "gusdantas' notes",
  website: 'https://notes.gusdantas.dev',
  description: 'The place where I share some of my ideas and thoughts',
  author: 'Gustavo Dantas <gusdantas15@gmail.com>',
};

export const PORTFOLIO_URL = 'https://gusdantas.dev';
export const GITHUB_PROFILE_URL = 'https://github.com/gustav0d';
export const GITHUB_REPO_URL = `${GITHUB_PROFILE_URL}/notes`;
export const TWITTER_URL = 'https://twitter.com/gusdantas';
export const LINKEDIN_URL =
  'https://www.linkedin.com/in/gustavo-dantas-galote/';

export const linkToMyRepo = (repo: string) => `${GITHUB_PROFILE_URL}/${repo}`;

export const links = [
  {
    name: 'GitHub',
    href: GITHUB_PROFILE_URL,
  },
  {
    name: 'X/Twitter',
    href: TWITTER_URL,
  },
  {
    name: 'LinkedIn',
    href: LINKEDIN_URL,
  },
];

import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: GITHUB_TOKEN,
  },
})

// Get search results
export const searchUsers = async (text) => {
  console.log('here')
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)

  console.log(response) // const response = await fetch(`https://api.github.com/search/users?q=brad`)
  // console.log(await response.json())
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}

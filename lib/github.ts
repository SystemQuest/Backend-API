import { Octokit } from '@octokit/rest'
import sodium from 'libsodium-wrappers'

export async function createGitHubClient(accessToken: string) {
  return new Octokit({
    auth: accessToken,
  })
}

export async function createRepository(
  octokit: Octokit,
  repoName: string,
  description: string,
  isPrivate: boolean = false
) {
  const { data } = await octokit.repos.createForAuthenticatedUser({
    name: repoName,
    description,
    private: isPrivate,
    auto_init: true,
  })

  return {
    id: String(data.id),
    name: data.name,
    full_name: data.full_name,
    clone_url: data.clone_url,
    html_url: data.html_url,
  }
}

export async function createRepositorySecret(
  octokit: Octokit,
  owner: string,
  repo: string,
  secretName: string,
  secretValue: string
) {
  // Get repository public key
  const { data: publicKeyData } = await octokit.actions.getRepoPublicKey({
    owner,
    repo,
  })

  // Encrypt the secret
  await sodium.ready
  const binkey = sodium.from_base64(publicKeyData.key, sodium.base64_variants.ORIGINAL)
  const binsec = sodium.from_string(secretValue)
  const encBytes = sodium.crypto_box_seal(binsec, binkey)
  const encrypted_value = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)

  // Create or update the secret
  await octokit.actions.createOrUpdateRepoSecret({
    owner,
    repo,
    secret_name: secretName,
    encrypted_value,
    key_id: publicKeyData.key_id,
  })
}

export async function createWorkflowFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  filePath: string,
  content: string,
  message: string
) {
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64'),
  })
}

export async function getAuthenticatedUser(octokit: Octokit) {
  const { data } = await octokit.users.getAuthenticated()
  return data
}

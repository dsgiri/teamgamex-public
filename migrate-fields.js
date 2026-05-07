// migrate-fields.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'vmnp0kg7',
  dataset: 'production',
  useCdn: false,
  token: 'skkxqokSUTv0HbmfPPEDrXQQEmxbesSyl8uOu5Mx3aBs2aunDlT6VFEOaQmhgZtebJSLAf0lbyC4R54MrPMOYKH3kHkuG1J9Qsmedt1jpDwncjxPU4ud9XF8Jl1hOMoOXdi5eGbRsiWqOhwYYNXVedTUuWKVNyD6Ld6I9sZLusT2xok5kDDd', // You'll need to generate this in manage.sanity.io
  apiVersion: '2026-05-07',
})

async function migrate() {
  const docs = await client.fetch(`*[_type == "videoPost"]`)
  console.log(`Found ${docs.length} documents to migrate...`)

  const transaction = client.transaction()

  docs.forEach((doc) => {
    transaction.patch(doc._id, (patch) => {
      const patches = {}

      // Move data from old keys to new keys if they exist
      if (doc.userBenefit && !doc.playerBenefit) patches.playerBenefit = doc.userBenefit
      if (doc.affiliateLink && !doc.shopLink) patches.shopLink = doc.affiliateLink
      if (doc.slug && !doc.postId) patches.postId = doc.slug

      // Unset the old "unknown" fields
      return patch.set(patches).unset(['userBenefit', 'affiliateLink', 'slug'])
    })
  })

  await transaction.commit()
  console.log('Bulk migration complete!')
}

migrate().catch(console.error)
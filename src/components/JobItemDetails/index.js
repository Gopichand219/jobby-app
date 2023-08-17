import Cookies from 'js-cookie'
import Header from '../Header'

import JobItemDetailsPage from '../JobItemDetailsPage'

const JobItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  const view = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const jobItemApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobDetails = fetchedData.job_details
      const updatedSkills = jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updatedJobDetails = {
        companyWebsiteUrl: jobDetails.company_website_url,
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: updatedSkills,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }
      const similarJobsData = fetchedData.similar_jobs
      const similarJobs = similarJobsData.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updatedJobDetails)
      const {title} = updatedJobDetails
      console.log(title)
      return (
        <JobItemDetailsPage
          updatedJobDetails={updatedJobDetails}
          similarJobs={similarJobs}
        />
      )
    }
    return 0
  }

  return (
    <>
      <Header />
      {view()}
    </>
  )
}

export default JobItemDetails

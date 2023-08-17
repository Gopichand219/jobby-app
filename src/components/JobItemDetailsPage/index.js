const JobItemDetailsPage = props => {
  const {updatedJobDetails, similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    title,
    location,
    rating,
    jobDescription,
    packagePerAnnum,
    skills,
    lifeAtCompany,
  } = updatedJobDetails

  return (
    <div className="bg">
      <div>
        <>
          <img src={companyLogoUrl} alt="logo" />
          <>
            <h1>{title}</h1>
            <p>{rating}</p>
          </>
        </>
        <p>{location}</p>
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skills.map(eachSkill => (
            <li>
              <img src={eachSkill.imageUrl} alt="skill" />
              <p>{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        <h1>Life At Company</h1>
        <>
          <p>{lifeAtCompany.description}</p>
          <img src={lifeAtCompany.imageUrl} alt="company life" />
        </>
      </div>
      <h1>Similar Jobs</h1>
      <ul>
        {similarJobs.map(eachJob => (
          <li>
            <>
              <img src={eachJob.companyLogoUrl} alt="logo" />
              <>
                <h1>{eachJob.title}</h1>
                <p>{eachJob.rating}</p>
              </>
            </>
            <p>{eachJob.location}</p>
            <p>{eachJob.employmentType}</p>
            <p>{eachJob.packagePerAnnum}</p>
            <hr />
            <h1>Description</h1>
            <p>{eachJob.jobDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobItemDetailsPage

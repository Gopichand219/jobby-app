const JobItem = props => {
  const {jobItemDetails, retrieveJob} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    title,
    location,
    rating,
    jobDescription,
    packagePerAnnum,
  } = jobItemDetails

  const onClickButton = () => {
    retrieveJob(id)
  }
  return (
    <li>
      <button type="button" onClick={onClickButton}>
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
      </button>
    </li>
  )
}

export default JobItem

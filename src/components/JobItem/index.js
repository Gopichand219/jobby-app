import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobItemDetails} = props
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

  return (
    <li>
      <Link to={`/jobs/${id}`}>
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
      </Link>
    </li>
  )
}

export default JobItem

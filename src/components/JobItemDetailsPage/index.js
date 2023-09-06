import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetailsPage extends Component {
  state = {
    jobApiStatus: apiStatusConstants.initial,
    fetchedData: '',
  }

  componentDidMount() {
    this.view()
  }

  view = async () => {
    this.setState({jobApiStatus: apiStatusConstants.inProgress})
    const {id} = this.props
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
      this.setState({fetchedData, jobApiStatus: apiStatusConstants.success})
    } else {
      this.setState({jobApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.view}>
        Retry
      </button>
    </>
  )

  renderJobsView = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {fetchedData} = this.state
    return (
      <ul>
        <li key="job">
          <>
            <img
              src={fetchedData.job_details.company_logo_url}
              alt="job details company logo"
            />
            <>
              <h1>{fetchedData.job_details.title}</h1>
              <p>{fetchedData.job_details.rating}</p>
            </>
          </>
          <p>{fetchedData.job_details.location}</p>
          <p>{fetchedData.job_details.employment_type}</p>
          <p>{fetchedData.job_details.package_per_annum}</p>
          <hr />
          <h1>Description</h1>
          <a
            href={fetchedData.job_details.company_website_url}
            alt="company website url"
            target="blank"
          >
            Visit
          </a>
          <p>{fetchedData.job_details.job_description}</p>

          <h1>Skills</h1>
          <ul>
            {fetchedData.job_details.skills.map(eachSkill => (
              <li>
                <img src={eachSkill.image_url} alt={eachSkill.name} />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life At Company</h1>
          <>
            <p>{fetchedData.job_details.life_at_company.description}</p>
            <img
              src={fetchedData.job_details.life_at_company.image_url}
              alt="life at company"
            />
          </>
        </li>
        <li key="similar job">
          <h1>Similar Jobs</h1>
          <ul>
            {fetchedData.similar_jobs.map(eachJob => (
              <li key={eachJob.id}>
                <Link to={`/jobs/${eachJob.id}`}>
                  <img
                    src={eachJob.company_logo_url}
                    alt="similar job company logo"
                  />
                  <>
                    <h1>{eachJob.title}</h1>
                    <p>{eachJob.rating}</p>
                  </>
                  <p>{eachJob.location}</p>
                  <p>{eachJob.employment_type}</p>
                  <p>{eachJob.package_per_annum}</p>
                  <hr />
                  <h1>Description</h1>
                  <p>{eachJob.job_description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    )
  }

  render() {
    const {fetchedData} = this.state
    console.log(fetchedData)

    return <div className="bg">{this.renderJobsView()}</div>
  }
}

export default JobItemDetailsPage

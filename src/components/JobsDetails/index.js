import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsDetails extends Component {
  state = {
    searchInput: '',
    employment: [],
    salary: salaryRangesList[0].salaryRangeId,
    jobsList: [],
    jobApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getJobsPageView()
  }

  getJobsPageView = () => {
    this.setState({
      jobApiStatus: apiStatusConstants.inProgress,
      profileApiStatus: apiStatusConstants.inProgress,
    })
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {salary, employment, searchInput} = this.state
    const employmentTypesJoined = employment.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesJoined}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCheckbox = event => {
    const {value, checked} = event.target
    const {employment} = this.state
    if (checked) {
      this.setState(prevState => ({
        employment: [...prevState.employment, value],
      }))
    } else {
      const updatedData = employment.filter(each => each !== value)
      this.setState({employment: updatedData})
    }
  }

  onChangeRadio = event => {
    this.setState({salary: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAllJobsView = () => {
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

  renderProfileFailureView = () => (
    <button type="button" onClick={this.getProfile} className="retry-btn">
      Retry
    </button>
  )

  renderProfileView = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderJobFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>Oops Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobs} className="retry-btn">
        Retry
      </button>
    </>
  )

  renderJobsSuccessView = () => {
    const {jobsList, searchInput} = this.state
    const updatedList = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(updatedList)
    return (
      <ul>
        {updatedList.map(eachJob => (
          <JobItem
            jobItemDetails={eachJob}
            key={eachJob.id}
            retrieveJob={this.retrieveJob}
          />
        ))}
      </ul>
    )
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-bg">
        <img src={profileDetails.profileImageUrl} alt="profile" />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {searchInput} = this.state
    return (
      <div className="products-bg">
        <>
          {this.renderProfileView()}
          <hr />
          <h1>Type of Employment</h1>
          <ul className="list">
            {employmentTypesList.map(eachEmployment => (
              <li key={eachEmployment.employmentTypeId}>
                <input
                  type="checkbox"
                  id={eachEmployment.employmentTypeId}
                  value={eachEmployment.label}
                  onChange={this.onChangeCheckbox}
                />
                <label htmlFor={eachEmployment.employmentTypeId}>
                  {eachEmployment.label}
                </label>
              </li>
            ))}
          </ul>
          <hr />
          <h1>Salary Range</h1>
          <ul>
            {salaryRangesList.map(eachSalary => (
              <li key={eachSalary.salaryRangeId}>
                <input
                  type="radio"
                  name="salary"
                  id={eachSalary.salaryRangeId}
                  value={eachSalary.label}
                  onChange={this.onChangeRadio}
                />
                <label htmlFor={eachSalary.salaryRangeId}>
                  {eachSalary.label}
                </label>
              </li>
            ))}
          </ul>
        </>
        <>
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button type="button" data-testid="searchButton">
            <BsSearch className="search-icon" />
          </button>
          <div>{this.renderAllJobsView()}</div>
        </>
      </div>
    )
  }
}

export default JobsDetails

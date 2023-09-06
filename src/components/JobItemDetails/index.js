import Header from '../Header'

import JobItemDetailsPage from '../JobItemDetailsPage'

const JobItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  return (
    <>
      <Header />
      <JobItemDetailsPage key={id} />
    </>
  )
}

export default JobItemDetails

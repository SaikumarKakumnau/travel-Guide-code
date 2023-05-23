import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelsList: []}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()

    const fetchedData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))

    this.setState({
      travelsList: fetchedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelsList} = this.state

    return (
      <ul className="travel-list-container">
        {travelsList.map(eachItem => (
          <li className="travel-item-container" key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="image"
            />
            <div className="text-container">
              <h1 className="name">{eachItem.name}</h1>
              <p className="description">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderApiStatusTravelGuide = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderApiStatusTravelGuide()}
      </div>
    )
  }
}

export default App

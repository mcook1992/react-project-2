class studentProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: this.props.location.pathname.replace("/studentProfile/", ""),
      modulesCompleted: [],
      pastSurveyData: []
    };

    this.handleModuleClick = this.handleModuleClick.bind(this);
  }

  handleModuleClick(event) {
    event.preventDefault();
    // console.log("button clicked!");
  }

  componentDidMount() {
    fetch("/studentProfiles/" + this.state.studentName)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var tempArray = [];
        data.modules.forEach(element => {
          tempArray.push(element.name);
        });
        this.setState({
          modulesCompleted: tempArray,
          pastSurveyData: data.data
        });
        console.log("Modules completed are " + this.state.modulesCompleted);
      });
  }

  render() {
    return <h1>Testing</h1>;
  }
}
export default studentProfilePage;

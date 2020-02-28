class ReadModuleClass extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentQuestionAnswers: [],
            newModuleAnswers = this.props.newModuleInfo
        }
    }

    readModule(object){
        var Name = object.Name;
        var quesstions = object.questions;
        var newModule = document.createElement("div");
      
        //go through each element in the list of questions made
        questions.forEach(element => {
          //if the teacher has marked the multiple choice question type
          if (element.questionType == "MC") {
            var newQuestion = document.createElement("select");
            newQuestion.id = element.id;
            var newQuestionLabel = document.createElement("h4");
            newQuestionLabel.textContent = element.questionText;
            //go through each of the potential answers the teacher listed and add them
            element.potentialQuestionAnswers.forEach(answer => {
              var option = document.createElement("option");
              option.value = answer;
              option.textContent = answer;
              newQuestion.appendChild(option);
            });
            newModule.appendChild(newQuestionLabel);
            newModule.appendChild(newQuestion);
          } else {
            var newQuestionLabel = document.createElement("h4");
            newQuestionLabel.textContent = element.questionText;
            var newQuestionAnswerSection = document.createElement("textarea");
            newModule.appendChild(newQuestionLabel);
            newModule.appendChild(newQuestionAnswerSection);
          }
        });
        return newModule
    }

    render() {
      return (
        <div>
          {this.state.newModuleAnswers.map((item, i) => (

        <div>
            <p>{item.text}</p>
            <p>{item.newQuestionLabel}</p>
            <textarea></textarea>

            </div>

          ))}
          
        </div>
      );
    }

}
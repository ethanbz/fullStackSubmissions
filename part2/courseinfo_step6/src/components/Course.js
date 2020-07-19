import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  };

  const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
  };
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, num) => {
      return total + num.exercises;
    }, 0);
    return <p>Number of exercises {sum}</p>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };
  
  const Content = ({ course }) => {
    const content = course.parts.map(part => <Part key={part.id} part={part} />)
    return (
      <div>
        {content}
      </div>
    );
  };

  export default Course
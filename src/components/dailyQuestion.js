// import { useState } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 200px;
`;

const questions = require("../data/Apr10.json");
const question = questions[0];

const DailyQuestion = () => {
  return (
    <>
      <StyledImage
        src={question.questionImage}
        alt={question.questionImageAlt}
      />
      <div>{question.questionText}</div>
    </>
  );
};

export default DailyQuestion;

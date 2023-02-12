import React from 'react'

const SkillStars = ({ user }) => {
     let golden = [];
     for (var i = 0; i < user.skillRating; i++) {
       golden.push(<i class="fa fa-star star-color" key={i}></i>);
  }

  return (
    <div>
      {user.skills} {golden}
      
    </div>
  );
}

export default SkillStars
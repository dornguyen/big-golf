import React from 'react'

const CourseAndPlayerScorecard = (props) => {
    let outScore = 0;
    let frontNineScore = 0;
    for(let i = 0; i < 9; i++){
        outScore += props.par_holes[i]
        frontNineScore += props.hole_scores[i]
    }
    let inScore = 0;
    let backNineScore = 0;
    for(let i = 9; i < props.par_holes.length; i++){
        inScore += props.par_holes[i]
        backNineScore += props.hole_scores[i]
    }
    let total = outScore + inScore
    let totalScore = frontNineScore+backNineScore;
  return (
    <table class="table table-condensed table-bordered">
        <tr class="success text-center">
            <th class="text-left">Hole</th>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <th class="text-uppercase"><strong>Out</strong></th>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <th class="text-uppercase"><strong>In</strong></th>
            <th class="text-uppercase"><strong>Total</strong></th>
            <th class="text-uppercase"><strong>HCP</strong></th>
            <th class="text-uppercase"><strong>NET</strong></th>
        </tr>
        <tr class="success text-center">
            <th class="text-left">Par</th>
            <td>{props.par_holes[0]}</td>
            <td>{props.par_holes[1]}</td>
            <td>{props.par_holes[2]}</td>
            <td>{props.par_holes[3]}</td>
            <td>{props.par_holes[4]}</td>
            <td>{props.par_holes[5]}</td>
            <td>{props.par_holes[6]}</td>
            <td>{props.par_holes[7]}</td>
            <td>{props.par_holes[8]}</td>
            <th class="text-uppercase"><strong>{outScore}</strong></th>
            <td>{props.par_holes[9]}</td>
            <td>{props.par_holes[10]}</td>
            <td>{props.par_holes[11]}</td>
            <td>{props.par_holes[12]}</td>
            <td>{props.par_holes[13]}</td>
            <td>{props.par_holes[14]}</td>
            <td>{props.par_holes[15]}</td>
            <td>{props.par_holes[16]}</td>
            <td>{props.par_holes[17]}</td>
            <th class="text-uppercase"><strong>{inScore}</strong></th>
            <th class="text-uppercase"><strong>{total}</strong></th>
        </tr>
        <tr class="success text-center">
            <th class="text-left">Score</th>
            <td>{props.hole_scores[0]}</td>
            <td>{props.hole_scores[1]}</td>
            <td>{props.hole_scores[2]}</td>
            <td>{props.hole_scores[3]}</td>
            <td>{props.hole_scores[4]}</td>
            <td>{props.hole_scores[5]}</td>
            <td>{props.hole_scores[6]}</td>
            <td>{props.hole_scores[7]}</td>
            <td>{props.hole_scores[8]}</td>
            <th class="text-uppercase"><strong>{frontNineScore}</strong></th>
            <td>{props.hole_scores[9]}</td>
            <td>{props.hole_scores[10]}</td>
            <td>{props.hole_scores[11]}</td>
            <td>{props.hole_scores[12]}</td>
            <td>{props.hole_scores[13]}</td>
            <td>{props.hole_scores[14]}</td>
            <td>{props.hole_scores[15]}</td>
            <td>{props.hole_scores[16]}</td>
            <td>{props.hole_scores[17]}</td>
            <th class="text-uppercase"><strong>{backNineScore}</strong></th>
            <th class="text-uppercase"><strong>{totalScore}</strong></th>
            <th class="text-uppercase"><strong>{props.card.handicap}</strong></th>
            <th class="text-uppercase"><strong>{totalScore-props.card.handicap}</strong></th>
        </tr>
    </table>
  )
}

export default CourseAndPlayerScorecard
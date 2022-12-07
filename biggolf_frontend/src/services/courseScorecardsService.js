import http from "../http-common"

class CourseScorecardService{
    getAll(page = 0){
        return http.get(`/course_scorecards?page=${page}`);
    }

    get(id){
        return http.get(`/course_scorecards/id/${id}`);
    }

    getByTournamentId(tournamentId){
        return http.get(`/course_scorecards/tournamentId/${tournamentId}`)
    }

    createCourseScorecard(data){
        return http.post("/course_scorecards/course-scorecard", data);
    }

    deleteCourseScorecard(courseScorecardId){
        return http.delete("/course_scorecards/course-scorecard", {data:{courseScorecard_id: courseScorecardId}})
    }
}
export default new CourseScorecardService();
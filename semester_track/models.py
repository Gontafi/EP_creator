from django.db import models

from api_op import models as subject_models


class EducationalProgram(models.Model):
    name = models.CharField(max_length=255, default='')
    level = models.CharField(max_length=255,
                             blank=True,
                             default='')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Semester(models.Model):
    edu_program = models.ForeignKey(to='EducationalProgram', on_delete=models.CASCADE)
    semester_number = models.IntegerField()
    subject = models.ManyToManyField(to=subject_models.Subject, blank=True)
    subject_to_choice = models.ManyToManyField(to=subject_models.SubjectToChoice, blank=True)

    def __str__(self):
        return f"{self.edu_program} - Semester {self.semester_number}"


# // const handleSubmit = async (e) => {
#   //   e.preventDefault();
#   //
#   //   if (!validatePrerequisites()) {
#   //     alert(prerequisiteWarning);
#   //     return;
#   //   }
#   //
#   //   try {
#   //     const eduProgramResponse = await axios.post(
#   //       'http://127.0.0.1:8000/semester/api/educational-program/',
#   //       educationalProgram
#   //     );
#   //
#   //     const eduProgramId = eduProgramResponse.data.id;
#   //
#   //     for (const [semesterIndex, subjectEntries] of semesters.entries()) {
#   //       const semesterResponse = await axios.post(
#   //         'http://127.0.0.1:8000/semester/api/semester/',
#   //         {
#   //           edu_program: eduProgramId,
#   //           semester_number: semesterIndex + 1,
#   //         }
#   //       );
#   //
#   //       const semesterId = semesterResponse.data.id;
#   //
#   //       for (const subjectEntry of subjectEntries) {
#   //         const isSubjectToChoice = subjectEntry !== null && typeof subjectEntry === 'object' && subjectEntry.subjectToChoice;
#   //         const subjectId = isSubjectToChoice ? subjectEntry.subject : subjectEntry;
#   //
#   //         if (isSubjectToChoice) {
#   //           const subjectToChoice = subjectToChoices.find((s) => s.id === parseInt(subjectId));
#   //           await axios.post('http://127.0.0.1:8000/semester/api/semester-subject-to-choice/', {
#   //             semester: semesterId,
#   //             subject_to_choice: subjectToChoice.id,
#   //           });
#   //         } else {
#   //           await axios.post('http://127.0.0.1:8000/semester/api/semester-subject/', {
#   //             semester: semesterId,
#   //             subject: subjectId,
#   //           });
#   //         }
#   //       }
#   //     }
#   //
#   //     alert('Educational program created successfully!');
#   //   } catch (error) {
#   //     console.error(error);
#   //     alert('An error occurred. Please check the console for details.');
#   //   }
#   // };

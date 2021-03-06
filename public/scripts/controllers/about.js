define(['scripts/app'], (ngApp) => {
  function aboutCtrl(DataService, $timeout, UtilityService) {
    const ctrl = this;

    ctrl.sections = [
      { id: 'bio', name: 'Biography' },
      { id: 'education', name: 'Education' },
      { id: 'employment', name: 'Employment' }
    ];

    DataService.getBio()
      .then((data) => {
        $timeout(() => {
          ctrl.bio = data.split('\n');
          ctrl.bioReady = true;
        });
      });

    DataService.getFacts()
      .then((data) => {
        $timeout(() => {
          ctrl.facts = UtilityService.shuffleArray(data);
          ctrl.factsReady = true;
        });
      });

    const eduPromise = DataService.getEducation()
      .then((data) => {
        $timeout(() => {
          ctrl.education = data;
          ctrl.educationReady = true;
        });
      });

    const empPromise = DataService.getEmployment()
      .then((data) => {
        $timeout(() => {
          ctrl.employment = data;
          ctrl.employmentReady = true;
        });
      });
  };

  ngApp.controller('AboutCtrl', ['DataService', '$timeout', 'UtilityService', aboutCtrl]);
});

define(['scripts/app'], (ngApp) => {
  // configuring targets and scroll behavior for the sidebar navigator links.
  function sidebarCtrl($scope, $element, $attrs, ScrollService, $timeout, $document) {
    const ctrl = this;

    /*
    ** @summary Normalize an array of sections based on either sections or ids given.
    */
    ctrl.final_sections = function () {
      if ($attrs.hasOwnProperty('ids') && Array.isArray(ctrl.ids)) {
        return ctrl.ids.map(id => ({ id: `${id}`.trimStart('#') }));
      }
      if ($attrs.hasOwnProperty('sections') && Array.isArray(ctrl.sections)) {
        return ctrl.sections.map(({ id, name }) => ({ id: `${id}`.trimStart('#'), name }));
      }
      return [];
    };

    /*
    ** @summary Normalize an array of ids from the available sections.
    */
    ctrl.final_ids = () => ctrl.final_sections().map(i => i.id);

    /*
    ** @summary Configure gsap ScrollTrigger behavior to indicate scroll position
    **   as it relates to the sidebar links.
    */
    let sidebarTweens = [];
    ctrl.setScrollBehavior = function (sectionSelectors, indicatorPrefix = '#side-nav-link-') {
      for (const existingTween of sidebarTweens) existingTween.kill();
      sidebarTweens = [];
      console.log(`configuring ${sectionSelectors.length} Tweens.`);
      for (let i = 0; i < sectionSelectors.length && sectionSelectors[i]; i++) {
        let id = sectionSelectors[i],
          targetSelector = `${indicatorPrefix}${i}`,
          selector = '#'.concat(`${id}`.trimStart('#'));
        sidebarTweens.push(
          ScrollService.ScrollTrigger.create({
            trigger: selector,
            start: `top center-=15%`,
            end: `bottom center-=15%`,
            scrub: true,
            invalidateOnRefresh: true,
            markers: true,
            toggleClass: {
              targets: targetSelector,
              className: 'active'
            }
          })
        );
      };
      if (sidebarTweens.length) setTimeout(ctrl.refreshScrollBehavior, 500);
    };

    /*
    ** @summary The DOM can shift around. When that happens, we need to recalculate
    **   ScrollTriggers references to DOM positions.
    */
    ctrl.refreshScrollBehavior = function () {
      for (const existingTween of sidebarTweens) existingTween.refresh();
      console.log(`Refreshed ${sidebarTweens.length} Tweens.`);
    };

    // We need to wait for the DOM to contain all the target elements before configuring Scroll behavior.
    let allReady = false;
    $scope.$watch(
      () => {
        if (allReady) return true;
        return ctrl.final_ids().reduce((allExist, id) => {
          return allExist && !!document.getElementById(id);
        }, true);
      },
      (newValue) => {
        if (newValue) {
          ctrl.setScrollBehavior(ctrl.final_ids());
        }
      }
    );

    // clean up the tweens when we're done so they don't leak into other views.
    ctrl.$onDestroy = () => sidebarTweens.forEach(tween => tween.kill());
  }
  ngApp.component('tbsSidebar', {
    bindings: {
      sections: '<',
      ids: '<'
    },
    templateUrl: '/templates/sidebar.html',
    controller: ['$scope', '$element', '$attrs', 'ScrollService', '$timeout', '$document', sidebarCtrl]
  });
});

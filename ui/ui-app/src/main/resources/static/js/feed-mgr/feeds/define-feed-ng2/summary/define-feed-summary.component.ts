import {Component, Injector, Input, OnInit} from "@angular/core";
import {FeedModel, Step} from "../model/feed.model";
import {StateRegistry, StateService} from "@uirouter/angular";
import {FormBuilder} from "@angular/forms";
import {TdLoadingService} from "@covalent/core/loading";
import {FEED_DEFINITION_STATE_NAME} from "../define-feed-states";
import {DefineFeedService} from "../services/define-feed.service";
import {AbstractLoadFeedComponent} from "../shared/AbstractLoadFeedComponent";
import {FeedLoadingService} from "../services/feed-loading-service";

@Component({
    selector: "define-feed-summary",
    styleUrls: ["js/feed-mgr/feeds/define-feed-ng2/summary/define-feed-summary.component.css"],
    templateUrl: "js/feed-mgr/feeds/define-feed-ng2/summary/define-feed-summary.component.html"
})
export class DefineFeedSummaryComponent extends AbstractLoadFeedComponent implements OnInit {

    static LOADER = "DefineFeedSummaryComponent.LOADER";

    @Input() stateParams:any;


    constructor(feedLoadingService: FeedLoadingService, stateService: StateService,  defineFeedService:DefineFeedService, private $$angularInjector: Injector) {
        super(feedLoadingService, stateService,defineFeedService);
        this.feedLoadingService.registerLoading();
        let sideNavService = $$angularInjector.get("SideNavService");
        sideNavService.showSideNav();
    }

    ngOnInit(){
        let feed = this.defineFeedService.getFeed();
        let feedId = this.stateParams? this.stateParams.feedId : undefined;
        this.initializeFeed(feedId);
        /*
        console.log('NAVIGATE TO FEED  ',feedId,feed)
        if ((feed && feedId && feed.id != feedId) || (feed == undefined && feedId != undefined)) {
            this.loadFeed(feedId).subscribe((feedModel:FeedModel) =>{
                this.feed = this.defineFeedService.getFeed();
            });
        }
        else {
            if (feed == undefined) {
                this.stateService.go(FEED_DEFINITION_STATE_NAME + ".select-template")
            }
            else {
                this.feed = this.defineFeedService.getFeed();
                this.selectedStep = this.defineFeedService.getCurrentStep();
            }
        }
        */

    }






    onStepSelected(step:Step){
        if(!step.isDisabled()) {
            this.selectedStep = step;
            let params = {}
            params ={"feedId":this.feed.id};
            this.stateService.go(step.sref,params,{location:"replace"})
        }
    }





}
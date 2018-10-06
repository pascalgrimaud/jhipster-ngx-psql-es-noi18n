import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';
import { TestInfiniteScrollService } from './test-infinite-scroll.service';

@Component({
    selector: 'jhi-test-infinite-scroll-delete-dialog',
    templateUrl: './test-infinite-scroll-delete-dialog.component.html'
})
export class TestInfiniteScrollDeleteDialogComponent {
    testInfiniteScroll: ITestInfiniteScroll;

    constructor(
        private testInfiniteScrollService: TestInfiniteScrollService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testInfiniteScrollService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testInfiniteScrollListModification',
                content: 'Deleted an testInfiniteScroll'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-infinite-scroll-delete-popup',
    template: ''
})
export class TestInfiniteScrollDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testInfiniteScroll }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestInfiniteScrollDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testInfiniteScroll = testInfiniteScroll;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

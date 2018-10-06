import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';
import { TestManyRelPaginDTOMySuffixService } from './test-many-rel-pagin-dto-my-suffix.service';

@Component({
    selector: 'jhi-test-many-rel-pagin-dto-my-suffix-delete-dialog',
    templateUrl: './test-many-rel-pagin-dto-my-suffix-delete-dialog.component.html'
})
export class TestManyRelPaginDTOMySuffixDeleteDialogComponent {
    testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix;

    constructor(
        private testManyRelPaginDTOService: TestManyRelPaginDTOMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testManyRelPaginDTOService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testManyRelPaginDTOListModification',
                content: 'Deleted an testManyRelPaginDTO'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-many-rel-pagin-dto-my-suffix-delete-popup',
    template: ''
})
export class TestManyRelPaginDTOMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyRelPaginDTO }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestManyRelPaginDTOMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testManyRelPaginDTO = testManyRelPaginDTO;
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

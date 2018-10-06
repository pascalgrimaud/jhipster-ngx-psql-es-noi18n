import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from './test-many-to-many-my-suffix.service';

@Component({
    selector: 'jhi-test-many-to-many-my-suffix-delete-dialog',
    templateUrl: './test-many-to-many-my-suffix-delete-dialog.component.html'
})
export class TestManyToManyMySuffixDeleteDialogComponent {
    testManyToMany: ITestManyToManyMySuffix;

    constructor(
        private testManyToManyService: TestManyToManyMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testManyToManyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testManyToManyListModification',
                content: 'Deleted an testManyToMany'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-many-to-many-my-suffix-delete-popup',
    template: ''
})
export class TestManyToManyMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyToMany }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestManyToManyMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testManyToMany = testManyToMany;
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

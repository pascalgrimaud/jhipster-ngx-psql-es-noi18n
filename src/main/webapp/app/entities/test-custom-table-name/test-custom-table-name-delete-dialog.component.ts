import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';
import { TestCustomTableNameService } from './test-custom-table-name.service';

@Component({
    selector: 'jhi-test-custom-table-name-delete-dialog',
    templateUrl: './test-custom-table-name-delete-dialog.component.html'
})
export class TestCustomTableNameDeleteDialogComponent {
    testCustomTableName: ITestCustomTableName;

    constructor(
        private testCustomTableNameService: TestCustomTableNameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testCustomTableNameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testCustomTableNameListModification',
                content: 'Deleted an testCustomTableName'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-custom-table-name-delete-popup',
    template: ''
})
export class TestCustomTableNameDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testCustomTableName }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestCustomTableNameDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testCustomTableName = testCustomTableName;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDivision } from 'app/shared/model/test-root/division.model';
import { DivisionService } from './division.service';

@Component({
    selector: 'jhi-division-delete-dialog',
    templateUrl: './division-delete-dialog.component.html'
})
export class DivisionDeleteDialogComponent {
    division: IDivision;

    constructor(private divisionService: DivisionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.divisionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'divisionListModification',
                content: 'Deleted an division'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-division-delete-popup',
    template: ''
})
export class DivisionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ division }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DivisionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.division = division;
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

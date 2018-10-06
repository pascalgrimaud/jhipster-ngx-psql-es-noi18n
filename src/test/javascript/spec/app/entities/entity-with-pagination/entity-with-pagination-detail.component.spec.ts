/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationDetailComponent } from 'app/entities/entity-with-pagination/entity-with-pagination-detail.component';
import { EntityWithPagination } from 'app/shared/model/entity-with-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithPagination Management Detail Component', () => {
        let comp: EntityWithPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithPaginationDetailComponent>;
        const route = ({ data: of({ entityWithPagination: new EntityWithPagination(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithPaginationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithPaginationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithPagination).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

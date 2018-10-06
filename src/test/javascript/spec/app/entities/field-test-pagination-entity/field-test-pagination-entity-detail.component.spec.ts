/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPaginationEntityDetailComponent } from 'app/entities/field-test-pagination-entity/field-test-pagination-entity-detail.component';
import { FieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';

describe('Component Tests', () => {
    describe('FieldTestPaginationEntity Management Detail Component', () => {
        let comp: FieldTestPaginationEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestPaginationEntityDetailComponent>;
        const route = ({ data: of({ fieldTestPaginationEntity: new FieldTestPaginationEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPaginationEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestPaginationEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestPaginationEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestPaginationEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

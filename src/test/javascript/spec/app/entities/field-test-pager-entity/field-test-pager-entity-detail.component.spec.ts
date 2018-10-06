/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPagerEntityDetailComponent } from 'app/entities/field-test-pager-entity/field-test-pager-entity-detail.component';
import { FieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';

describe('Component Tests', () => {
    describe('FieldTestPagerEntity Management Detail Component', () => {
        let comp: FieldTestPagerEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityDetailComponent>;
        const route = ({ data: of({ fieldTestPagerEntity: new FieldTestPagerEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPagerEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestPagerEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestPagerEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestPagerEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

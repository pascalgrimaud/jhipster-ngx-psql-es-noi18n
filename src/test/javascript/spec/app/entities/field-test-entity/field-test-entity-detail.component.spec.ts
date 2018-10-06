/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestEntityDetailComponent } from 'app/entities/field-test-entity/field-test-entity-detail.component';
import { FieldTestEntity } from 'app/shared/model/field-test-entity.model';

describe('Component Tests', () => {
    describe('FieldTestEntity Management Detail Component', () => {
        let comp: FieldTestEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestEntityDetailComponent>;
        const route = ({ data: of({ fieldTestEntity: new FieldTestEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

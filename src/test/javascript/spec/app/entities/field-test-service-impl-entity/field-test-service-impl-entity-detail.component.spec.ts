/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityDetailComponent } from 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-detail.component';
import { FieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceImplEntity Management Detail Component', () => {
        let comp: FieldTestServiceImplEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityDetailComponent>;
        const route = ({ data: of({ fieldTestServiceImplEntity: new FieldTestServiceImplEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceImplEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestServiceImplEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestServiceImplEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestServiceImplEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

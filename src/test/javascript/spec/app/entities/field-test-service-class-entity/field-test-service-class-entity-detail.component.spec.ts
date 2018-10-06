/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityDetailComponent } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity-detail.component';
import { FieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceClassEntity Management Detail Component', () => {
        let comp: FieldTestServiceClassEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityDetailComponent>;
        const route = ({ data: of({ fieldTestServiceClassEntity: new FieldTestServiceClassEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceClassEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestServiceClassEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestServiceClassEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestServiceClassEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
